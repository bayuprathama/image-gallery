// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // check for secret token
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  try {
    // regenerate index route '/' when revalidated
    await res.unstable_revalidate('/');
    return res.json({ revalidate: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
