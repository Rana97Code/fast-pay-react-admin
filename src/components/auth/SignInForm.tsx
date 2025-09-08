import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Button from "../ui/button/Button";
import { useLazyQuery } from "@apollo/client"; 
import { useNavigate } from "react-router";
import { Form, Input as AntdInput } from "antd";
import { LOGIN_QUERY } from "../../graphql/queries/queries";

export default function SignInForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Lazy query hook for login
  const [loginQuery, { loading, error }] = useLazyQuery(LOGIN_QUERY);

  // Handle form submission
  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    try {
      const { data } = await loginQuery({
        variables: { email, password },
        fetchPolicy: "no-cache", // Prevent caching for login
      });

      if (data?.login && data?.login.user.role === "ADMIN") {
        localStorage.setItem("token", data?.login.token);
        localStorage.setItem("user", JSON.stringify(data?.login.user));
        navigate("/");
      } else {
        console.error("User is not an admin");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Admin Login
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <Form
              onFinish={handleSubmit}
              initialValues={{ email: "", password: "" }}
              layout="vertical"
              className="space-y-6"
            >
              <Form.Item
                name="email"
                label={<span className="text-white">Email</span>}
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <AntdInput
                  placeholder="info@gmail.com"
                  className="input border-gray-400 rounded"
                  type="email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span className="text-white">Password</span>}
                rules={[{ required: true, message: "Please enter your password!" }]}
              >
                <div className="relative">
                  <AntdInput
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className="input border-gray-400 rounded"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </Form.Item>

              <Form.Item>
                <Button className="w-full" size="sm" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
                {error && <p className="text-red-500 mt-2">{error.message}</p>}
              </Form.Item>
            </Form>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
