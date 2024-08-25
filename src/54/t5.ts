export { }

// for global of NodeJS
//  > find -type f -name '*.d.ts' -exec grep -He 'namespace .*NodeJS' '{}' \;
declare global {
    namespace NodeJS {
        interface Module {
            exports2: string
        }
    }
}
module.exports2 = 'hi';
