import React from "react";
import mergeClassesNames from "../../utils/mergeClassNames";
import Styllable from "../../utils/Styllable";
import styles from "./styles.module.css"

export interface Props<T> extends Styllable {
    header: React.ReactNode
    renderItem: (item: T) => React.ReactNode
    items: T[]
}

export default function SimpleList<T>(props: Props<T>) {
    const {header, items, renderItem} = props

    return (
        <div style={props.style} className={mergeClassesNames([styles["root"], props.className])}>
            <div className={styles["header"]}>
                {header}
            </div>

            <div className={styles["list"]}>
                {items.map(renderItem)}
            </div>
        </div>
    )
}