-- 학습 기록 테이블 생성
CREATE TABLE IF NOT EXISTS learning_records (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT,
  classify_score NUMERIC(5, 2),
  compare_score NUMERIC(5, 2),
  total_score NUMERIC(5, 2),
  classification_responses JSONB,
  comparison_responses JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 추가 (검색 최적화)
CREATE INDEX IF NOT EXISTS idx_learning_records_created_at ON learning_records(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_learning_records_student_name ON learning_records(student_name);

-- RLS (Row Level Security) 정책 설정 (필요한 경우)
-- ALTER TABLE learning_records ENABLE ROW LEVEL SECURITY;

-- 예시 정책: 모든 사용자가 읽기/쓰기 가능 (필요에 따라 수정)
-- CREATE POLICY "Allow all operations" ON learning_records
--   FOR ALL
--   USING (true)
--   WITH CHECK (true);

