import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import "../styles/Header.css";

const schema = (isSignup) =>
  z.object({
    name: isSignup
      ? z.string().min(1, "Name is required")
      : z.string().optional(),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

function AuthModal() {
  const { isSignup, toggleSignup, closeAuthModal } = useAuth();
  const [fadeState, setFadeState] = useState("fade-in");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema(isSignup)),
  });

  useEffect(() => {
    document.body.classList.add("blur-background");
    return () => {
      document.body.classList.remove("blur-background");
      reset();
      setSuccessMessage("");
    };
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        await updateProfile(userCredential.user, { displayName: data.name });
        showSuccess("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        showSuccess("Logged in successfully!");
      }
      closeModalWithAnimation();
    } catch (error) {
      alert(error.message);
    }
  };

  const closeModalWithAnimation = () => {
    setFadeState("fade-out");
    setTimeout(() => {
      closeAuthModal();
      setFadeState("fade-in");
    }, 600);
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className={`modal-overlay ${fadeState}`}>
      <div className="custom-modal">
        <button className="close-button" onClick={closeModalWithAnimation}>
          &times;
        </button>

        <h2 className="modal-title">{isSignup ? "Create Account" : "Login"}</h2>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                className={`modal-input ${errors.name ? "input-error" : ""}`}
              />
              <p className="error-message">
                {errors.name ? errors.name.message : ""}
              </p>
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`modal-input ${errors.email ? "input-error" : ""}`}
          />
          <p className="error-message">
            {errors.email ? errors.email.message : ""}
          </p>

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`modal-input ${errors.password ? "input-error" : ""}`}
          />
          <p className="error-message">
            {errors.password ? errors.password.message : ""}
          </p>

          <p className="modal-link">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <span
              className="signup-link"
              onClick={() => {
                toggleSignup();
                reset();
              }}
              style={{ cursor: "pointer", color: "#007bff" }}
            >
              {isSignup ? "Login" : "Sign up"}
            </span>
          </p>

          <button type="submit" className="modal-submit">
            {isSignup ? "Sign up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
