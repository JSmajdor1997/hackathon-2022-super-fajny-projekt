export interface CSSConditionalClass {
    readonly condition: boolean
    readonly class: string
    readonly else?: string
}

export interface FirstFitConditionalClass {
    readonly takeFirstFit: CSSConditionalClass[]
    readonly else?: string
}

function isCSSConditionalClass(obj: CSSConditionalClass | FirstFitConditionalClass): obj is CSSConditionalClass {
    return (obj as CSSConditionalClass).condition != undefined
}

export default function mergeClassesNames(classes: (FirstFitConditionalClass | CSSConditionalClass | string | undefined)[]): string {
    const EMPTY = ""
    const SEPARATOR = " "

    return classes.map(it => {
        if (it == undefined) {
            return EMPTY
        }

        if (typeof it == "string") {
            return it
        }

        if (isCSSConditionalClass(it)) {
            if (it.condition) {
                return it.class
            }

            if (it.else != undefined) {
                return it.else
            }

            return EMPTY
        }

        const firstFit = it.takeFirstFit.find(fit => fit.condition)

        if (firstFit != null) {
            return firstFit.class
        }

        return it.else ?? EMPTY
    }).join(SEPARATOR)
}