import { shouldLog } from '@/lib/environment';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/utils/auth';
import { useCallback, useEffect, useState } from 'react';

export interface UserTradingAccountCounts {
	liveAccounts: number;
	demoAccounts: number;
	loading: boolean;
	error: string | null;
	refresh: () => Promise<void>;
}

export const useUserTradingAccountCounts = (): UserTradingAccountCounts => {
	const [liveAccounts, setLiveAccounts] = useState(0);
	const [demoAccounts, setDemoAccounts] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchCounts = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const user = getCurrentUser();
			if (!user) {
				setLiveAccounts(0);
				setDemoAccounts(0);
				setLoading(false);
				return;
			}

			if (shouldLog()) {
				console.log('Fetching trading account counts for user:', user.id);
			}

			// Fetch both counts in parallel
			const [liveRes, demoRes] = await Promise.all([
				supabase
					.from('tradingAccounts')
					.select('id', { count: 'exact', head: true })
					.eq('user_id', user.id)
					.ilike('account_type', 'live'),
				supabase
					.from('tradingAccounts')
					.select('id', { count: 'exact', head: true })
					.eq('user_id', user.id)
					.ilike('account_type', 'demo'),
			]);

			if (liveRes.error) {
				throw new Error(liveRes.error.message);
			}
			if (demoRes.error) {
				throw new Error(demoRes.error.message);
			}

			setLiveAccounts(liveRes.count ?? 0);
			setDemoAccounts(demoRes.count ?? 0);

			if (shouldLog()) {
				console.log('Counts fetched:', {
					live: liveRes.count,
					demo: demoRes.count,
				});
			}
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Failed to fetch trading account counts';
			setError(message);
			if (shouldLog()) console.error('useUserTradingAccountCounts error:', err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCounts();
	}, [fetchCounts]);

	return {
		liveAccounts,
		demoAccounts,
		loading,
		error,
		refresh: fetchCounts,
	};
};
