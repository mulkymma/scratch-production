const recipient = 'scratch.production0@gmail.com'

export async function POST(request: Request) {
  let body: {
    name?: unknown
    email?: unknown
    message?: unknown
  }

  try {
    body = await request.json()
  } catch {
    return Response.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    )
  }

  const name =
    typeof body.name === 'string' ? body.name.trim() : ''

  const email =
    typeof body.email === 'string' ? body.email.trim() : ''

  const message =
    typeof body.message === 'string' ? body.message.trim() : ''

  if (
    !name ||
    !email ||
    !message ||
    name.length > 200 ||
    email.length > 320 ||
    message.length > 10000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return Response.json(
      { error: 'Please provide valid enquiry details.' },
      { status: 400 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !from) {
    return Response.json(
      { error: 'Email delivery is not configured.' },
      { status: 503 }
    )
  }

  const emailResponse = await fetch(
    'https://api.resend.com/emails',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `New project enquiry from ${name}`,
        text: `Name: ${name}
Email: ${email}

Project details:
${message}`,
      }),
    }
  )

  if (!emailResponse.ok) {
    return Response.json(
      { error: 'Unable to send your enquiry right now.' },
      { status: 502 }
    )
  }

  return Response.json({ success: true })
}