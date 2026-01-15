-- Create profiles table (links to auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  phone TEXT,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'scrapper', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scrappers table
CREATE TABLE public.scrappers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  scrap_type TEXT NOT NULL,
  weight TEXT,
  pickup_date DATE NOT NULL,
  pickup_time TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  notes TEXT,
  images TEXT[],
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'on_the_way', 'completed', 'cancelled')),
  estimated_amount DECIMAL(10,2),
  final_amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_assignments table
CREATE TABLE public.order_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  scrapper_id UUID NOT NULL REFERENCES public.scrappers(id) ON DELETE CASCADE,
  accepted_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scrappers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_assignments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON public.orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Scrappers policies (viewable by all authenticated users for assignment purposes)
CREATE POLICY "Authenticated users can view active scrappers" ON public.scrappers
  FOR SELECT TO authenticated USING (active = true);

CREATE POLICY "Scrappers can update their own record" ON public.scrappers
  FOR UPDATE USING (auth.uid() = user_id);

-- Order assignments policies
CREATE POLICY "Users can view assignments for their orders" ON public.order_assignments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_id AND orders.user_id = auth.uid())
  );

CREATE POLICY "Scrappers can view their assignments" ON public.order_assignments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.scrappers WHERE scrappers.id = scrapper_id AND scrappers.user_id = auth.uid())
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_scrappers_updated_at
  BEFORE UPDATE ON public.scrappers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, phone, name)
  VALUES (NEW.id, NEW.phone, COALESCE(NEW.raw_user_meta_data->>'name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for scrap images
INSERT INTO storage.buckets (id, name, public)
VALUES ('scrap-images', 'scrap-images', true);

-- Storage policies for scrap-images bucket
CREATE POLICY "Users can upload scrap images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'scrap-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view scrap images" ON storage.objects
  FOR SELECT USING (bucket_id = 'scrap-images');

CREATE POLICY "Users can update their own scrap images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'scrap-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own scrap images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'scrap-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Enable realtime for orders
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;