import http from "./httpService";

const userRequests = [
  { user_id: 1, user_name: "amal@dpi.com", nic: "12345" },
  { user_id: 2, user_name: "kamal@dpi.com", nic: "12345" },
  { user_id: 3, user_name: "ruwani@dpi.com", nic: "12345" },
  { user_id: 4, user_name: "shehani@dpi.com", nic: "12345" },
];

export function getUserRequests() {
  return { data: userRequests };
}

export function acceptRequest(user_id) {}
