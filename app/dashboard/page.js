import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import prisma from '@/db/prisma';
import { redirect } from "next/navigation";

import PageHeading from '@/components/PageHeading/PageHeading'
import Form from "@/components/form";

async function getWorkouts(userId) {
	const workouts = await prisma.workoutLog.findMany({
		where: {
			userId: userId,
		  },
		include: {
			WorkoutLogExercise: {
			include: {
				Exercise: true,
				SetLog: true,
			}
			},
			User: true,
			WorkoutPlan: true,
		}
	});
	return workouts;
  }
  

export default async function DashboardPage() {
	const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
	if (!session) redirect("/login");
	const workouts = await getWorkouts(session.user.userId)
	
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
					<li key={workout.id}>
					<strong>Workout Name:</strong> {workout.name}
					<strong>, Date:</strong> {new Date(workout.date).toLocaleDateString()}
      
						<ul>
							{workout.WorkoutLogExercise.map(wle => (
							<li key={wle.id}>
								<strong>Exercise:</strong> {wle.Exercise.name}
								
								<ul>
								{wle.SetLog.map(set => (
									<li key={set.id}>
									<strong>Weight:</strong> {set.weight} 
									<strong>, Reps:</strong> {set.reps}
									</li>
								))}
								</ul>
							</li>
							))}
						</ul>
						</li>
					))}
					</ul>

		</>
	);
}
