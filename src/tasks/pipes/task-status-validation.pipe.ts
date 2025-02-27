import {BadRequestException, PipeTransform} from "@nestjs/common";
import {TaskStatus} from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedTaskStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];


    transform(value: any): any {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedTaskStatus.indexOf(status);
        return idx !== -1;

    }
}