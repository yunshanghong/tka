import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'typeFilterLength' })
export class TypeFilterLengthPipe implements PipeTransform {

    transform(obj: any, findType: String): number {
        return obj.filter((item: any) => item.typeName === findType).length;
    }
}


@Pipe({ name: 'typeFilterObject' })
export class TypeFilterObjectPipe implements PipeTransform {

    transform(obj: any, findType: String): Object {
        if (findType === "All") {
            return obj;
        }
        return obj.filter((item: any) => item.typeName === findType);
    }
}



@Pipe({ name: 'modelFilterBrand' })
export class ModelFilterBrandPipe implements PipeTransform {

    transform(obj: any, findType: String): Object {
        if (findType === "All") {
            return obj;
        }
        return obj.filter((item: any) => item.typeName === findType);
    }
}


@Pipe({ name: 'modelFilterCate' })
export class ModelFilterCatePipe implements PipeTransform {

    transform(obj: any, findType: String): Object {
        if (findType === "All") {
            return obj;
        }
        return obj.filter((item: any) => item.category === findType);
    }
}
