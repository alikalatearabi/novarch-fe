import jwt from "jsonwebtoken"; // For creating JWT tokens

// Mock database for demonstration
const users = [
  {
    id: 1,
    email: "test@example.com",
    password: "password123", // Plain-text password for testing purposes
    name: "Test User",
  },
];

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required." }),
        { status: 400 }
      );
    }

    // Find the user by email
    const user = users.find((u) => u.email === email);
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password." }),
        { status: 401 }
      );
    }

    // Directly compare the plain-text password (for testing only)
    if (password !== user.password) {
      return new Response(
        JSON.stringify({ message: "Wrong password." }),
        { status: 401 }
      );
    }

    // Create a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, "your-secret-key", {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Respond with the token and user info
    return new Response(
      JSON.stringify({ token, user: { id: user.id, name: user.name, email: user.email } }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login API Error:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong. Please try again." }),
      { status: 500 }
    );
  }
}
