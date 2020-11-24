import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'typeFilterLength' })
export class TypeFilterLengthPipe implements PipeTransform {

    transform(obj: any, findType: String): number {
        if (findType === 'All') {
            return obj.length;
        }
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
        return obj.filter((item: any) => item.brand === findType);
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


@Pipe({ name: 'cateFilterBrand' })
export class CateFilterBrandPipe implements PipeTransform {

    transform(obj: any, findType: String): Object {
        if (findType === "All") {
            return [{ brandCode: "All", code: "All", name: "All", order: 9999 }];
        }
        return [{ brandCode: "All", code: "All", name: "All", order: 9999 }, ...obj.filter((item: any) => item.brandCode === findType)];
    }
}


@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}
