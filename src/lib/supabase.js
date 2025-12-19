import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// 환경 변수가 있을 때만 Supabase client 생성
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// 학습 데이터 저장
export async function saveLearningData(data) {
  if (!supabase) {
    console.warn('Supabase is not configured. Skipping data save.')
    return null
  }

  try {
    const { data: result, error } = await supabase
      .from('learning_records')
      .insert([
        {
          student_name: data.studentName || '익명',
          classify_score: data.classifyScore,
          compare_score: data.compareScore,
          total_score: data.totalScore,
          classification_responses: data.classificationResponses,
          comparison_responses: data.comparisonResponses,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) throw error
    return result
  } catch (error) {
    console.error('Error saving learning data:', error)
    // Supabase가 설정되지 않은 경우에도 게임은 계속 진행되도록
    return null
  }
}

// 학습 데이터 조회
export async function getLearningData() {
  if (!supabase) {
    console.warn('Supabase is not configured. Returning empty array.')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('learning_records')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching learning data:', error)
    return []
  }
}

