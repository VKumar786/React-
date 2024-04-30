import { generateUserAppointmentsKey } from './../../../../../../udemy-REACT-QUERY/section-start-code/lazy-days-code-at-section-8-start/client/src/react-query/key-factories';
import type { Appointment } from "@shared/types";

import { axiosInstance, getJWTHeader } from "../../../axiosInstance";

import { useLoginData } from "@/auth/AuthContext";
import { useQuery } from "@tanstack/react-query";

async function getUserAppointments(
  userId: number,
  userToken: string
): Promise<Appointment[] | null> {
  const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
    headers: getJWTHeader(userToken),
  });
  return data.appointments;
}

export function useUserAppointments(): Appointment[] {
  const { userId, userToken, clearLoginData, setLoginData } = useLoginData();

  const fallback: Appointment[] = []
  const {data: userAppointments = fallback} = useQuery({
    enabled: !!userId,
    queryKey: generateUserAppointmentsKey(userId, userToken),
    queryFn: () => getUserAppointments(userId, userToken)
  })
  return userAppointments;
}
