import { describe, it, expect, test } from "vitest";
import {
  emailErrorBag,
  firtnameErrorBag,
  lastnameErrorBag,
  phoneErrorBag,
  validation,
} from "./useForm";

describe("useForm", () => {
  describe("validation", () => {
    const { email, phone, isRequired, isAValidHumanName } = validation;
    it("should be a valid e-mail", () => {
      expect(email.check("john.doe@mail.io")).toStrictEqual({
        error: false,
        message: null,
      });
    });
    it("should not be a valid e-mail", () => {
      expect(email.check("john.doemail.io")).toStrictEqual({
        error: true,
        message: "Le champs email n'est pas au bon format",
      });
    });
    it("should be check requierd field", () => {
      expect(isRequired.check("john")).toStrictEqual({
        error: false,
        message: null,
      });
    });
    it("should be check requierd field and return error messag", () => {
      expect(isRequired.check("")).toStrictEqual({
        error: true,
        message: "Le champs est requis",
      });
    });
    it("should unvalidate an odd human name", () => {
      expect(isAValidHumanName.check("a1199")).toStrictEqual({
        error: true,
        message: "Le champs n'est pas au bon format",
      });
    });
    it("should validate a human name", () => {
      expect(isAValidHumanName.check("john")).toStrictEqual({
        error: false,
        message: null,
      });
    });
    it("should validate a phone number", () => {
      expect(phone.check("0606060606")).toStrictEqual({
        error: false,
        message: null,
      });
      expect(phone.check("+33606060606")).toStrictEqual({
        error: false,
        message: null,
      });
      expect(phone.check("9+33606060606")).toStrictEqual({
        error: true,
        message: "Le numéro de téléphone n'est pas au bon format",
      });
    });
  });
  describe("error bags", () => {
    test("firtnameErrorBag", () => {
      expect(firtnameErrorBag("")).toStrictEqual({
        error: true,
        message: ["Le champs est requis", "Le champs n'est pas au bon format"],
      });
      expect(firtnameErrorBag("99")).toStrictEqual({
        error: true,
        message: ["Le champs n'est pas au bon format"],
      });
      expect(firtnameErrorBag("john")).toStrictEqual({
        error: false,
        message: [],
      });
    });
    test("lastnameErrorBag", () => {
      expect(lastnameErrorBag("")).toStrictEqual({
        error: true,
        message: ["Le champs est requis", "Le champs n'est pas au bon format"],
      });
      expect(lastnameErrorBag("99")).toStrictEqual({
        error: true,
        message: ["Le champs n'est pas au bon format"],
      });
      expect(lastnameErrorBag("john")).toStrictEqual({
        error: false,
        message: [],
      });
    });
    test("emailErrorBag", () => {
      expect(emailErrorBag("")).toStrictEqual({
        error: true,
        message: [
          "Le champs est requis",
          "Le champs email n'est pas au bon format",
        ],
      });
      expect(emailErrorBag("john.doemail.io")).toStrictEqual({
        error: true,
        message: ["Le champs email n'est pas au bon format"],
      });
      expect(emailErrorBag("john.do@email.io")).toStrictEqual({
        error: false,
        message: [],
      });
    });
    test("phoneErrorBag", () => {
      expect(phoneErrorBag("")).toStrictEqual({
        error: true,
        message: [
          "Le champs est requis",
          "Le numéro de téléphone n'est pas au bon format",
        ],
      });
      expect(phoneErrorBag("23456789")).toStrictEqual({
        error: true,
        message: ["Le numéro de téléphone n'est pas au bon format"],
      });
      expect(phoneErrorBag("0678765463")).toStrictEqual({
        error: false,
        message: [],
      });
    });
  });
});
