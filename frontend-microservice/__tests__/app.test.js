import * as fs from "fs";
import validations from '../server/validation/docs.js';
import {getFileType, isMimeSuported, isValidFile} from '../server/utils/validateDocument.js';

const png_doc = fs.readFileSync("./__tests__/files/dummy.png");
const pdf_doc = fs.readFileSync("./__tests__/files/dummy.pdf");
const corrupted_pdf_doc = fs.readFileSync("./__tests__/files/corrupt-dummy.pdf");

test("Doc ID alue should match schema", () => {
  const validReq = { params: { docId: '123' } };
  const negativeIntReq = { params: { docId: -123 } };
  const stringIntReq = { params: { docId: "Invalid" } };

  expect(validReq).toMatchSchema(validations.getDocument);
  expect(negativeIntReq).not.toMatchSchema(validations.getDocument);
  expect(stringIntReq).not.toMatchSchema(validations.getDocument);

});

test("Validate PDF and PNG files", async () => {
  expect(isValidFile(png_doc)).resolves.toBeTruthy();
  expect(isValidFile(pdf_doc)).resolves.toBeTruthy();
  expect(isValidFile(corrupted_pdf_doc)).resolves.toBe(false);
});

test("Get mime from file", async () => {
  expect(getFileType(png_doc)).resolves.toStrictEqual({"ext": "png", "mime": "image/png"});
  expect(getFileType(pdf_doc)).resolves.toStrictEqual({"ext": "pdf", "mime": "application/pdf"});
});

test("Validate supported mimes", async () => {
  const pdf_mime = "application/pdf";
  const png_mime = "image/png";
  const application_json_mime = "application/json";

  expect(isMimeSuported(pdf_mime)).toBeTruthy();
  expect(isMimeSuported(png_mime)).toBeTruthy();
  expect(isMimeSuported(application_json_mime)).toBeFalsy();
});