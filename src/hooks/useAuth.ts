import { useState } from "react";

interface LoginData {
  email: string;
  senha: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async ({ email, senha }: LoginData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://ribamar-sag-api.gkgtsp.easypanel.host/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }), 
      });

      if (!response.ok) {
        throw new Error("Login inválido");
      }

      const data = await response.json();
      const { token, user } = data;

      localStorage.setItem("token", token);
      return { success: true, user };
    } catch (err: any) {
      console.error("Erro no login:", err);
      setError("Credenciais inválidas ou erro no servidor.");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
