import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Button from "../ui/button/Button";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { Form, Input as AntdInput } from "antd";
import { SIGNUP_MUTATION } from "../../graphql/mutations/mutations";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const handleSubmit = async (values: {
    userName: string;
    email: string;
    password: string;
    mobile: string;
    profilePicture?: string;
    role?: string;
  }) => {
    try {
      const { data } = await signUp({
        variables: { signUpDto: values },
      });

      if (data?.signUp) {
        localStorage.setItem("user", JSON.stringify(data.signUp));
        navigate("/signin");
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fill in the details to sign up!
            </p>
          </div>
          <div>
            <Form
              onFinish={handleSubmit}
              initialValues={{
                userName: "",
                email: "",
                password: "",
                mobile: "",
                profilePicture: "",
                role: "",
              }}
              layout="vertical"
              className="space-y-6"
            >
              <Form.Item
                name="userName"
                label={<span className="text-white">Username</span>}
                className="text-black"
                rules={[{ required: true, message: "Please enter your username!" }]}
              >
                <AntdInput placeholder="JohnDoe" className="input border-gray-400 rounded" />
              </Form.Item>

              <Form.Item
                name="email"
                label={<span className="text-white">Email</span>}
                className="text-black"
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
                className="text-black"
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

              <Form.Item
                name="mobile"
                label={<span className="text-white">Mobile</span>}
                className="text-black"
                rules={[{ required: true, message: "Please enter your mobile number!" }]}
              >
                <AntdInput placeholder="1234567890" className="input border-gray-400 rounded" />
              </Form.Item>

              <Form.Item name="profilePicture" label={<span className="text-white">Profile Picture (optional)</span>}>
                <AntdInput placeholder="https://example.com/me.png" className="input border-gray-400 rounded" />
              </Form.Item>

              <Form.Item name="role" label={<span className="text-white">Role (optional)</span>} className="text-black">
                <AntdInput placeholder="user / admin" className="input border-gray-400 rounded" />
              </Form.Item>

              <Form.Item>
                <Button className="w-full" size="sm" disabled={loading}>
                  {loading ? "Signing up..." : "Sign up"}
                </Button>
                {error && <p className="text-red-500 mt-2">{error.message}</p>}
              </Form.Item>
            </Form>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
