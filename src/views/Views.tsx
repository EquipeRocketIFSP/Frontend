import HomeView from "./home/Home";
import SignInView from "./signin/SignIn";
import PainelView from "./painel/Painel";
import EmployeesView from "./employees/Employees";
import FormEmployeesView from "./employees/form-employees/FormEmployees";
import ScheduleView from "./schedule/Schedule";
import FormScheduleView from "./schedule/form-schedule/FormSchedule";
import TutorView from "./tutor/Tutor";
import TutorFormView from "./tutor/form-tutor/FormTutor"

namespace Views {
    export const Home = HomeView;
    export const SignIn = SignInView;
    export const Painel = PainelView;

    export type Home = HomeView;
    export type SignIn = SignInView;
    export type Painel = PainelView;

    export namespace Employees {
        export const Page = EmployeesView;
        export const Form = FormEmployeesView;

        export type Page = EmployeesView;
        export type Form = FormEmployeesView;
    }

    export namespace Schedule {
        export const Page = ScheduleView;
        export const Form = FormScheduleView;

        export type Page = ScheduleView;
        export type Form = FormScheduleView;
    }

    export namespace Tutor {
        export const Page = TutorView;
        export const Form = TutorFormView;

        export type Page = TutorView;
        export type Form = TutorFormView;
    }
}

export default Views;