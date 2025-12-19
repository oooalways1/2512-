# Vercel 배포 가이드

## 방법 1: Vercel 웹 대시보드에서 배포 (추천)

### 1단계: GitHub에 프로젝트 푸시

1. GitHub에서 새 레포지토리 생성
2. 프로젝트 폴더에서 Git 초기화 및 푸시:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/사용자명/레포지토리명.git
git push -u origin main
```

### 2단계: Vercel에 프로젝트 연결

1. [Vercel](https://vercel.com) 접속 및 로그인 (GitHub 계정으로 로그인 권장)
2. "Add New..." → "Project" 클릭
3. GitHub 레포지토리 선택
4. "Import" 클릭

### 3단계: 프로젝트 설정

1. **Framework Preset**: Vite 선택 (자동 감지될 수 있음)
2. **Root Directory**: `./` (기본값)
3. **Build Command**: `npm run build` (기본값)
4. **Output Directory**: `dist` (기본값)
5. **Install Command**: `npm install` (기본값)

### 4단계: 환경 변수 설정 (중요!)

1. "Environment Variables" 섹션으로 이동
2. 다음 변수 추가:

**변수 1:**
- Name: `VITE_SUPABASE_URL`
- Value: Supabase 프로젝트 URL (예: `https://abcdefghijk.supabase.co`)
- Environment: Production, Preview, Development 모두 선택

**변수 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: Supabase anon key (예: `eyJhbGc...`)
- Environment: Production, Preview, Development 모두 선택

3. "Add" 버튼으로 각 변수 추가
4. 모든 환경 변수 추가 후 "Deploy" 클릭

### 5단계: 배포 완료!

- 배포가 완료되면 자동으로 URL이 생성됩니다 (예: `https://your-project.vercel.app`)
- 도메인도 변경 가능합니다

---

## 방법 2: Vercel CLI로 배포

### 1단계: Vercel CLI 설치

```bash
npm install -g vercel
```

### 2단계: 로그인

```bash
vercel login
```

### 3단계: 배포

프로젝트 폴더에서 실행:

```bash
vercel
```

처음 배포 시:
1. 프로젝트 설정 질문에 답변
2. 환경 변수 입력 (Supabase URL과 Key)
3. 배포 완료!

### 4단계: 프로덕션 배포

```bash
vercel --prod
```

---

## 환경 변수 설정 확인

배포 후 환경 변수가 제대로 설정되었는지 확인:

1. Vercel 대시보드 → 프로젝트 선택
2. Settings → Environment Variables
3. 모든 변수가 올바르게 설정되어 있는지 확인

## 문제 해결

### 빌드 에러 발생 시

1. Vercel 대시보드 → Deployments → 에러 로그 확인
2. 로컬에서 빌드 테스트: `npm run build`
3. 환경 변수가 제대로 설정되었는지 확인

### 환경 변수가 적용되지 않을 때

1. 환경 변수 설정 후 **재배포** 필요
2. Production, Preview, Development 모두 설정했는지 확인
3. 변수명이 정확한지 확인 (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)

### Supabase 연결 에러

1. Supabase 프로젝트가 활성화되어 있는지 확인
2. Supabase 테이블이 생성되었는지 확인 (`supabase_schema.sql` 실행 여부)
3. 브라우저 콘솔에서 에러 메시지 확인

## 자동 배포 설정

GitHub에 푸시할 때마다 자동으로 배포됩니다:
- `main` 브랜치에 푸시 → Production 배포
- 다른 브랜치에 푸시 → Preview 배포

## 참고사항

- 무료 플랜에서도 충분히 사용 가능
- 커스텀 도메인 연결 가능
- HTTPS 자동 적용
- 배포 속도가 빠름

