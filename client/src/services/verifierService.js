import http from "./httpService";

const verifierRequests = [
  {
    verifier_id: 1,
    verifier_name: "Seylan Bank",
    verifier_email: "seylan@dpi.com",
  },
  { verifier_id: 2, verifier_name: "HNB Bank", verifier_email: "hnb@dpi.com" },
  {
    verifier_id: 3,
    verifier_name: "Sampath Bank",
    verifier_email: "sampath@dpi.com",
  },
];

export function getVerifierRequests() {
  return { data: verifierRequests };
}

export default { getVerifierRequests };
