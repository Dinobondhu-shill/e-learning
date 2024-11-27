import jwt from 'jsonwebtoken'

const createToken = (res, user, message) => {
  try {
    // Generate the token with a 7-day expiration
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    // Send the token as an HTTP-only cookie
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      })
      .send({
        success: true,
        message,
        user,
        token
      });
  } catch (error) {
    console.error("Error creating token:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default createToken