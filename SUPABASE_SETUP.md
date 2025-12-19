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

## 4. 데이터베이스 테이블 생성

1. Supabase 대시보드에서 **SQL Editor** 메뉴 클릭
2. `supabase_schema.sql` 파일의 내용을 복사하여 붙여넣기
3. **RUN** 버튼 클릭하여 테이블 생성

## 5. Vercel 배포 시 환경 변수 설정

Vercel에서 배포할 때도 환경 변수를 설정해야 합니다:

1. Vercel 대시보드에서 프로젝트 선택
2. **Settings** → **Environment Variables** 메뉴 이동
3. 다음 변수 추가:
   - `VITE_SUPABASE_URL`: Supabase 프로젝트 URL
   - `VITE_SUPABASE_ANON_KEY`: Supabase anon key
4. 각 환경(Production, Preview, Development)에 대해 설정
5. 저장 후 재배포

## 문제 해결

- 환경 변수가 인식되지 않으면 개발 서버를 재시작하세요 (`npm run dev`)
- 브라우저 콘솔에서 에러 확인
- `.env` 파일이 루트 디렉토리에 있는지 확인
- `VITE_` 접두사가 있는지 확인


