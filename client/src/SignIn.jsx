import { supabase } from "./supabaseClient";

function SignIn() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) console.error(error.message);
  };

  const page = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0a0a0a, #1a1a2e)",
    fontFamily: '"Outfit", sans-serif',
    color: "#fff",
  };

  const card = {
    width: "380px",
    padding: "40px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(22px)",
    border: "1px solid rgba(255,255,255,0.25)",
    textAlign: "center",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  };

  const heading = {
    marginBottom: "10px",
    fontSize: "28px",
    fontWeight: "700",
  };

  const subtext = {
    fontSize: "14px",
    color: "#aaa",
    marginBottom: "30px",
  };

  const button = {
    width: "100%",
    padding: "14px",
    borderRadius: "999px",
    border: "none",
    background: "#ffffff",
    color: "#000",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
  };

  const buttonHover = {
    background: "#e5e5e5",
  };

  const footer = {
    marginTop: "20px",
    fontSize: "13px",
    color: "#888",
  };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={heading}>Welcome</h1>
        <p style={subtext}>Sign in to continue to ContentIQ AI</p>

        <button
          type="button"
          style={button}
          onClick={handleLogin}
          onMouseOver={(e) => (e.target.style.background = "#e5e5e5")}
          onMouseOut={(e) => (e.target.style.background = "#ffffff")}
        >
          Continue with Google
        </button>

        <div style={footer}>
          
        </div>
      </div>
    </div>
  );
}

export default SignIn;
