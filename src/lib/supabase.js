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

// 회원가입
export async function signUp(email, password, name) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split('@')[0],
        },
      },
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error signing up:', error)
    throw error
  }
}

// 로그인 (이름 또는 이메일로)
export async function signIn(nameOrEmail, password) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  try {
    let email = nameOrEmail
    
    // 이름으로 입력된 경우, 이메일 형식이 아니면 자동 생성된 이메일 패턴으로 변환 시도
    if (!nameOrEmail.includes('@')) {
      // 이름으로 입력된 경우, learning_records에서 해당 이름의 사용자를 찾아서 이메일 추정
      // 또는 여러 가능한 이메일 패턴 시도
      // 간단하게 이름 기반 이메일 패턴으로 변환
      const cleanName = nameOrEmail.trim().replace(/\s+/g, '')
      
      // learning_records에서 해당 이름의 최신 기록을 찾아서 이메일 추정
      try {
        const { data: records } = await supabase
          .from('learning_records')
          .select('student_name')
          .eq('student_name', nameOrEmail.trim())
          .order('created_at', { ascending: false })
          .limit(1)
        
        // 이름으로는 직접 이메일을 찾을 수 없으므로, 
        // 사용자에게 이메일을 입력하도록 안내하거나
        // 여러 패턴을 시도해야 함
        // 일단 이름을 그대로 사용 (실제로는 실패할 수 있음)
      } catch (e) {
        // 무시하고 계속 진행
      }
      
      // 이름만으로는 로그인할 수 없으므로, 사용자에게 이메일을 입력하도록 안내
      // 또는 회원가입 시 받은 이메일을 사용하도록 안내
      throw new Error('이름으로는 로그인할 수 없습니다. 회원가입 시 받은 이메일을 입력해주세요.')
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}

// 로그아웃
export async function signOut() {
  if (!supabase) {
    return
  }

  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

// 현재 사용자 정보 가져오기
export async function getCurrentUser() {
  if (!supabase) {
    return null
  }

  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// Auth 상태 변경 리스너
export function onAuthStateChange(callback) {
  if (!supabase) {
    return { data: { subscription: null } }
  }

  return supabase.auth.onAuthStateChange(callback)
}

