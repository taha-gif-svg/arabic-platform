-- دالة آمنة: SECURITY INVOKER + search_path محدد
DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- سحب الصلاحيات من الجميع
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM anon;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM authenticated;
ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;

-- تفعيل RLS على كل الجداول
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

-- سياسات RLS
CREATE POLICY "users_select_own" ON public.users FOR SELECT USING (auth.uid()::text = id OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid()::text AND role = 'ADMIN'));
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid()::text = id) WITH CHECK (auth.uid()::text = id);
CREATE POLICY "sections_public_read" ON public.sections FOR SELECT USING (true);
CREATE POLICY "chapters_public_read" ON public.chapters FOR SELECT USING (isPublished = true);
CREATE POLICY "exams_public_read" ON public.exams FOR SELECT USING (true);
CREATE POLICY "questions_public_read" ON public.questions FOR SELECT USING (true);
CREATE POLICY "attempts_select_own" ON public.exam_attempts FOR SELECT USING (user_id = auth.uid()::text);
CREATE POLICY "attempts_insert_own" ON public.exam_attempts FOR INSERT WITH CHECK (user_id = auth.uid()::text);
CREATE POLICY "answers_select_own" ON public.user_answers FOR SELECT USING (EXISTS (SELECT 1 FROM public.exam_attempts WHERE id = attempt_id AND user_id = auth.uid()::text));
CREATE POLICY "answers_insert_own" ON public.user_answers FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.exam_attempts WHERE id = attempt_id AND user_id = auth.uid()::text));
CREATE POLICY "certificates_select_own" ON public.certificates FOR SELECT USING (user_id = auth.uid()::text);
CREATE POLICY "certificates_insert_restricted" ON public.certificates FOR INSERT WITH CHECK (false);
CREATE POLICY "progress_select_own" ON public.progress FOR SELECT USING (user_id = auth.uid()::text);
CREATE POLICY "progress_insert_own" ON public.progress FOR INSERT WITH CHECK (user_id = auth.uid()::text);
CREATE POLICY "progress_update_own" ON public.progress FOR UPDATE USING (user_id = auth.uid()::text) WITH CHECK (user_id = auth.uid()::text);
