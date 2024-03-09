import { verifyOtp } from "../actions";

export default function VerifyLoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="token">Token:</label>
      <input id="token" name="token" type="text" required />
      <button formAction={verifyOtp}>Verify OTP</button>
    </form>
  );
}
