// app.d.ts
/// <reference types="lucia" />

declare namespace Lucia {
    type Auth = import("./auth/lucia").Auth;

    // User and Session Attributes
    type DatabaseUserAttributes = {
        username: string;
        workoutLogs: WorkoutLog[];
        workoutPlans: WorkoutPlan[];
    };

    type DatabaseSessionAttributes = {
        active_expires: number;
        idle_expires: number;
        user_id: string;
        username?: string;
        timers: Timer[];
    };

    // Model Definitions
    type User = {
        id: string;
        username: string;
        Session: Session[];
        Key: Key[];
        workoutLogs: WorkoutLog[];
        workoutPlans: WorkoutPlan[];
    };

    type Session = {
        id: string;
        active_expires: number;
        idle_expires: number;
        user_id: string;
        username?: string;
        User: User;
        timers: Timer[];
    };

    type Key = {
        id: string;
        user_id: string;
        hashed_password?: string;
        User: User;
    };

    type Exercise = {
        id: string;
        name: string;
        aliases: string[];
        primary_muscles: Muscle[];
        secondary_muscles: Muscle[];
        force?: ForceType;
        level: LevelType;
        mechanic?: MechanicType;
        equipment?: EquipmentType;
        category: CategoryType;
        instructions: string[];
        description?: string;
        tips: string[];
        date_created: Date;
        date_updated?: Date;
        imagePath?: string;
    };

    type SetLog = {
        id: string;
        workoutLogExerciseId: string;
        weight: number;
        reps: number;
        order?: number;
    };

    type Timer = {
        id: string;
        sessionId: string;
        startTime: Date;
        pauseTime?: Date;
        pausedDuration: number;
        status: TimerStatus;
    };

    type WorkoutLog = {
        id: string;
        userId: string;
        date: Date;
        createdAt: Date;
        duration?: number;
        name: string;
        workoutPlanId?: string;
        date_updated?: Date;
    };

    type WorkoutPlan = {
        id: string;
        name: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        notes?: string;
    };

    // Enums
    enum CategoryType {
        strength,
        stretching,
        plyometrics,
        strongman,
        powerlifting,
        cardio,
        olympic_weightlifting
    }

    enum EquipmentType {
        body_only,
        machine,
        other,
        foam_roll,
        kettlebells,
        dumbbell,
        cable,
        barbell,
        bands,
        medicine_ball,
        exercise_ball,
        e_z_curl_bar
    }

    enum ForceType {
        pull,
        push,
        static
    }

    enum LevelType {
        beginner,
        intermediate,
        expert
    }

    enum MechanicType {
        compound,
        isolation
    }

    enum Muscle {
        abdominals,
        hamstrings,
        adductors,
        quadriceps,
        biceps,
        shoulders,
        chest,
        middle_back,
        calves,
        glutes,
        lower_back,
        lats,
        triceps,
        traps,
        forearms,
        neck,
        abductors
    }

    enum TimerStatus {
        RUNNING,
        PAUSED,
        STOPPED
    }
}
