import { Lock, Mail, Soup } from "lucide-react"
import { useState } from "react"

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      alert("Lütfen e-posta ve şifre alanlarını doldur.")
      return
    }

    onLogin(email)
  }

  function handleGuestLogin() {
    onLogin("Misafir Kullanıcı")
  }

  return (
    <main className="min-h-screen bg-[var(--secondary)] flex items-center justify-center p-4">
      <section className="w-full max-w-[430px] min-h-screen bg-[var(--secondary)] px-8 py-10 flex flex-col justify-center">
        <div className="text-center mb-12">
          <div className="w-[150px] h-[150px] mx-auto rounded-full border-2 border-[var(--primary)] flex items-center justify-center mb-8">
            <Soup
              size={92}
              className="text-[var(--primary)]"
              strokeWidth={1.8}
            />
          </div>

          <h1 className="text-[44px] font-bold mb-3">
            Foodly
          </h1>

          <p className="text-[var(--text-secondary)] text-base leading-7">
            Lezzetli tarifleri keşfet, kaydet ve kendi tariflerini oluştur.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="block text-sm font-semibold mb-2">
              E-posta
            </span>

            <div className="bg-white rounded-2xl border border-orange-100 px-4 py-3 flex items-center gap-3">
              <Mail size={22} className="text-[var(--primary)]" />

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ornek@mail.com"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </label>

          <label className="block mb-6">
            <span className="block text-sm font-semibold mb-2">
              Şifre
            </span>

            <div className="bg-white rounded-2xl border border-orange-100 px-4 py-3 flex items-center gap-3">
              <Lock size={22} className="text-[var(--primary)]" />

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Şifreni gir"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </label>

          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-white rounded-2xl py-4 font-semibold text-lg mb-4"
          >
            Giriş Yap
          </button>

          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full bg-orange-100 text-[var(--primary)] rounded-2xl py-4 font-semibold text-lg"
          >
            Misafir Olarak Devam Et
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage