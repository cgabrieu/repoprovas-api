import { TypeEnum } from "../entities/TestEntity";

export default interface ITest {
    year: number;
    semester: number;
    type: TypeEnum,
    link: string,
    teacherId: number;
    classId: number;
}