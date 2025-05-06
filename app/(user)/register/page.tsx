import { Metadata } from "next";

import CustomLink from "@/components/common/CustomLink";
import RegisterForm from "@/components/profile/RegisterForm";

export const metadata: Metadata = {
  title: "REGISTER | NEXT REALWORLD",
  description: "Please register before login"
}

export default function Register() {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign Up</h1>
            <p className="text-xs-center">
              <CustomLink href="/user/login" as="/user/login">
                Have an account?
              </CustomLink>
            </p>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
};
