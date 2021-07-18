import { useMemo, useState } from 'react';
import { useUrlQueryParam } from "utils/url"

export const useProjrctParams = () => {
    const [keys] = useState([' ', 'personId'])
    const [param, setParam] = useUrlQueryParam(keys)
    return [
        useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
        setParam
    ] as const
}