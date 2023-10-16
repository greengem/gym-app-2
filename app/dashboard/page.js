import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import prisma from '@/db/prisma';

import PageHeading from '@/components/PageHeading/PageHeading'
import Form from "@/components/form";

async function getWorkouts(){
	const workouts = await prisma.workoutLog.findMany();
	return workouts;
  }

export default async function DashboardPage() {
	const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
	const workouts = await getWorkouts()

	if (!session) redirect("/login");
	return (
		<>
			<PageHeading pageTitle="Dashboard" />
			<p>User id: {session.user.userId}</p>
			<p>Username: {session.user.username}</p>
			<Form action="/api/logout">
				<input type="submit" value="Sign out" />
			</Form>
			<ul>
				{workouts.map((workout) => (
				<li key={workout.id}>{workout.name}</li>
				))}
			</ul>
		</>
	);
}
