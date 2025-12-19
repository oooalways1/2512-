# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 접속하여 회원가입/로그인
2. "New Project" 클릭
3. 프로젝트 이름, 데이터베이스 비밀번호 입력 후 프로젝트 생성

## 2. API 키와 URL 찾기

1. Supabase 대시보드에서 프로젝트 선택
2. 좌측 메뉴에서 **Settings** (⚙️) 클릭
3. **API** 메뉴 클릭
4. 다음 정보 확인:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co` 형태의 URL
   - **anon public key**: `eyJhbGc...`로 시작하는 긴 문자열

## 3. 환경 변수 설정

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 아래 내용을 입력하세요:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

**중요:**
- `.env` 파일은 프로젝트 루트 디렉토리에 위치해야 합니다
- `VITE_` 접두사가 붙어야 Vite에서 인식합니다
- URL과 Key 앞뒤에 따옴표 없이 입력하세요
- 실제 값으로 교체하세요 (예시 값이 아닌 실제 값)

## 4. Authentication (인증) 설정

1. Supabase 대시보드에서 **Authentication** 메뉴 클릭
2. **Providers** 탭에서 **Email** 활성화
   - "Enable Email provider" 토글 ON
   - "Confirm email" 옵션 설정 (테스트 시에는 OFF로 설정 가능)
3. **Settings** 탭에서 필요한 설정 확인

## 5. 데이터베이스 테이블 생성

1. Supabase 대시보드에서 **SQL Editor** 메뉴 클릭
2. `supabase_schema.sql` 파일의 내용을 복사하여 붙여넣기
3. **RUN** 버튼 클릭하여 테이블 생성

## 6. Vercel 배포 시 환경 변수 설정

Vercel에서 배포할 때도 환경 변수를 설정해야 합니다:

1. Vercel 대시보드에서 프로젝트 선택
2. **Settings** → **Environment Variables** 메뉴 이동
3. 다음 변수 추가:
   - `VITE_SUPABASE_URL`: Supabase 프로젝트 URL
   - `VITE_SUPABASE_ANON_KEY`: Supabase anon key
4. 각 환경(Production, Preview, Development)에 대해 설정
5. 저장 후 재배포

## 로그인/회원가입 기능

이 프로젝트는 Supabase Authentication을 사용합니다:
- 회원가입: 이메일, 비밀번호, 이름 입력
- 로그인: 이메일, 비밀번호로 로그인
- 로그인한 사용자의 게임 기록이 자동으로 저장됩니다

## 문제 해결

- 환경 변수가 인식되지 않으면 개발 서버를 재시작하세요 (`npm run dev`)
- 브라우저 콘솔에서 에러 확인
- `.env` 파일이 루트 디렉토리에 있는지 확인
- `VITE_` 접두사가 있는지 확인


