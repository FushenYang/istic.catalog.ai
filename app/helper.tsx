import type { IconProps } from '@mdi/react/dist/IconProps';
import Icon from '@mdi/react';
import { ClientOnly } from 'remix-utils/client-only';

export default function ClientOnlyIcon(props: IconProps) {
	return <ClientOnly>{() => <Icon {...props} />}</ClientOnly>;
}
