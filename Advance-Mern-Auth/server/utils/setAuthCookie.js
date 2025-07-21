import jwt from "jsonwebtoken";

const setAuthCookie = (res,userId)=>{
     const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true, // hides the cookie from JavaScript, guarding it against XSS(Cross-Site Scripting.) theft console.log(document.cookie)
      secure: process.env.DEV_MODE === "production", // use HTTPS‑only cookies online; allow HTTP on localhost for dev
      sameSite: process.env.DEV_MODE === "production" ? "strict" : "lax", // strict in production for CSRF protection; none in dev to allow cross-origin localhost requests
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}

export default setAuthCookie;