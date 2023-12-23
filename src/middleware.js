export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/buyers", "/user", "/user/add-to-cart"],
};
