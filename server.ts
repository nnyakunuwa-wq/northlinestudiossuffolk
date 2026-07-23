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
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        console.error('RESEND_API_KEY is not set in environment variables.');
        return res.status(500).json({ success: false, error: 'Server configuration error: Email service is not configured.' });
      }
      const resend = new Resend(apiKey);
      const { name, email, message } = req.body;
      
      const htmlEmail = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 40px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 0.1em; color: #ffffff;">NORTHLINE</h1>
            <p style="margin: 10px 0 0 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">New Project Enquiry</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <div style="margin-bottom: 30px;">
              <h2 style="margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Sender Details</h2>
              <p style="margin: 0 0 8px 0; font-size: 16px;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a></p>
            </div>

            <div>
              <h2 style="margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Message</h2>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0;">
                <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; font-size: 15px; color: #334155;">${message}</p>
              </div>
            </div>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">&copy; ${new Date().getFullYear()} Northline Studios</p>
          </div>
        </div>
      `;

      const { data, error } = await resend.emails.send({
        from: 'Northline Studios <onboarding@resend.dev>',
        to: ['nnyakunuwa@gmail.com'], // Free tier limit: can only send to verified emails
        reply_to: email,
        subject: `New Enquiry: ${name}`,
        html: htmlEmail,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      });
      
      if (error) {
        console.error('Resend API error:', error);
        return res.status(400).json({ success: false, error: error.message || error.name || "Failed to send email" });
      }

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
