import { useState, type FormEvent } from "react";
import axios from "axios";
import { Field, Label, Switch } from "@headlessui/react";
import {
  ChevronDownIcon, 
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [agreed, setAgreed] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    setLoading(true);
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };
    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        "https://fullstack-student-backend.onrender.com/api/auth",
        data,
        {
          headers,
        }
      );

      setSuccessMsg("Signup successful!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgreed(false);

      localStorage.setItem("userId", response.data._id);
        navigate("/userprofile");
        // This navigate is where you would redirect the user after signing up
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="isolate bg-black px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          SignUp
        </h2>
        <p className="mt-2 text-lg text-white">
          Join us to access awesome features!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="block text-sm text-white">
              First name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-2 w-full rounded-md border px-3.5 py-2 text-base text-gray-900 bg-white"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm text-white">
              Last name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-2 w-full rounded-md border px-3.5 py-2 text-base text-gray-900 bg-white"
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label className="block text-sm text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-md border px-3.5 py-2 text-base text-gray-900 bg-white"
            />
          </div>

          {/* phoneNumber */}
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm/6 text-white"
            >
              Phone number
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option>US</option>
                    <option>CA</option>
                    <option>NIG</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+234-246-24527"
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          {/* Password */}
          <div className="relative sm:col-span-2">
            <label className="block text-sm text-white">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-md border px-3.5 py-2 text-base text-gray-900 pr-10 bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative sm:col-span-2">
            <label className="block text-sm text-white">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 w-full rounded-md border px-3.5 py-2 text-base text-gray-900 pr-10 bg-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Privacy Agreement */}
          <Field className="flex items-center gap-x-4 sm:col-span-2">
            <Switch
              checked={agreed}
              onChange={setAgreed}
              className={`group flex w-10 h-6 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-black transition ${
                agreed ? "bg-indigo-600" : "bg-gray-400"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-4 w-4 transform rounded-full bg-white shadow transition ${
                  agreed ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </Switch>
            <Label className="text-sm text-white">
              By selecting this, you agree to our{" "}
              <a href="#" className="font-semibold text-indigo-600 underline">
                privacy&nbsp;policy
              </a>
              .
            </Label>
          </Field>
        </div>

        {/* Feedback Messages */}
        {successMsg && <p className="mt-6 text-green-600">{successMsg}</p>}
        {errorMsg && <p className="mt-6 text-red-600">{errorMsg}</p>}

        {/* Submit Button */}
        <div className="mt-10">
          <button
            type="submit"
            disabled={loading}
            className={`block w-full rounded-md px-4 py-2.5 text-center text-sm font-semibold text-white shadow ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {loading ? "Loading..." : "Signup"}
          </button>
        </div>
      </form>
    </div>
  );
}
