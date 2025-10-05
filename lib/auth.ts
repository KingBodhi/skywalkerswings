import * as jose from 'jose';
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { loggers } from './logger';
export type Session = { userId: string; role: "ADMIN"|"EDITOR"|"DISTRIBUTOR"|"CUSTOMER"; email: string };
const name = "wr_session";
const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET || (() => {
    throw new Error('SESSION_SECRET environment variable is required for JWT signing');
  })()
);
export async function setSession(payload: Session){
  const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("7d").sign(secret);
  cookies().set(name, token, { httpOnly: true, sameSite: "lax", path: "/" });
}
export async function getSession(): Promise<Session|null>{
  try {
    const token = cookies().get(name)?.value;
    if(!token) {
      loggers.auth.debug('No session token found');
      return null;
    }
    const { payload } = await jwtVerify(token, secret);
    return payload as Session;
  } catch (error) {
    loggers.auth.warn({ error: error instanceof Error ? error.message : 'Unknown error' }, 'Session verification failed');
    return null;
  }
}
export function clearSession(){ cookies().set(name, "", { httpOnly:true, sameSite:"lax", path:"/", maxAge:0 }); }
