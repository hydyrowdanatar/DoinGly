export default interface allTasksDto {
    uuid:      string;
    text:      string;
    completed: boolean;
    List:      ListDto;
}

export interface ListDto {
    uuid: string;
    name: string;
}