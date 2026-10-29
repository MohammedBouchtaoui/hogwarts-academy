
export function ValidateSpellPower(
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
): void {
    const originalMethod = descriptor.value as (
        ...args: unknown[]
    ) => unknown;

    descriptor.value = function (
        this: unknown,
        ...args: unknown[]
    ): unknown {
        const spell = args[0];

        if (
            typeof spell === "object" &&
            spell !== null &&
            "power" in spell &&
            typeof spell.power === "number" &&
            spell.power < 0
        ) {
            throw new Error("Spell power cannot be negative");
        }

        return originalMethod.apply(this, args);
    };
}

//************************** logiUe dd  decorator de  cache  **************
export function Cache(
    _target: object,    propertyKey: string | symbol, descriptor: PropertyDescriptor
): void {
    const originalMethod = descriptor.value as (
        ...args: unknown[]
    ) => unknown;

    // Un cache indépendant pour chaque instance de classe.
    const instanceCaches = new WeakMap<
        object,
        Map<string, unknown>
    >();
    descriptor.value = function (
        this: object,
        ...args: unknown[]
    ): unknown {
        let cache = instanceCaches.get(this);

        if (!cache) {

            cache = new Map<string, unknown>();
            instanceCaches.set(this, cache);
        }

        // Les mêmes arguments produisent la même clé.
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            console.log(`[CACHE HIT] ${String(propertyKey)}`);
            return cache.get(key);
        }
        console.log(`[CACHE MISS] ${String(propertyKey)}`);

        const result = originalMethod.apply(this, args);

        cache.set(key, result);

        return result;
    };
}
