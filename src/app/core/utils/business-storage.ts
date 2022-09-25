import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})

export class BusinessStorage {

    get(key: string): any {
        return JSON.parse(localStorage.getItem(key)!);
    }
    set(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data))
    }
    remove(key: string) {
        localStorage.removeItem(key)
    }
    clear() {
        localStorage.clear()
    }
}