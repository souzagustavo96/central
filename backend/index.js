import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

// Carregar variáveis do .env
dotenv.config();

const app = express();
const port = 5000;

// Configurações da Microsoft usando variáveis do .env
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tenantId = process.env.TENANT_ID;

// Middleware para lidar com CORS e corpo da requisição (JSON)
app.use(cors());
app.use(bodyParser.json());

// Endpoint para login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Realizando a requisição para a Microsoft para validar as credenciais
    const response = await axios.post(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'password',
        username: email, // O email do usuário
        password: password // A senha do usuário
      })
    );

    const { access_token } = response.data;

    // Se obtivermos um access_token, o login foi bem-sucedido
    if (access_token) {
      console.log(`Usuário autenticado com sucesso: ${email}`); // Log de sucesso
      res.json({ accessToken: access_token });
    } else {
      console.log(`Falha na autenticação para o usuário: ${email}`); // Log de falha
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (err) {
    console.error('Erro ao autenticar na Microsoft:', err);
    res.status(500).json({ error: 'Erro interno ao autenticar' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});