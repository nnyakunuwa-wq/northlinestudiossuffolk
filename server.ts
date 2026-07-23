import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/contact", async (req, res) => {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY || 're_J6Soywqn_G1tnSdRiRBhcTK2WKmx5zwnn');
      const { name, email, business, needs, message } = req.body;
      
      const data = await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>',
        to: ['nnyakunuwa@gmail.com'], // Resend free tier only allows sending to the registered email address
        replyTo: email,
        subject: `New Project Enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nBusiness: ${business}\nPackage: ${needs}\nMessage: ${message}`
      });
      
      res.json({ success: true, data });
    } catch (error) {
      console.error('Resend error:', error);
      res.status(500).json({ success: false, error: error instanceof Error ? error.message : String(error) });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
