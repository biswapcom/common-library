export * from './balance.type'
export * from './blockchain.type';
export * from './pair.type';
export * from './user.type';


export type LoggerOptions = {
    /** Count of empty lines before output message */
    newline?: number;

    /** Count of empty lines after output message */
    break?: number;

    /** To bold the message */
    bold?: boolean;

    /** To underline the message */
    underline?: boolean;
}