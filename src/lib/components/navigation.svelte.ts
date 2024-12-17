class Navigation {
    private static instance: Navigation;
    versions: string[] = $state(['v1', 'v2', 'v3']);
    currentVersion: string = 'v1';
    docNav: any[] = $state([]);

    static getInstance(): Navigation {
        if (!Navigation.instance) {
            Navigation.instance = new Navigation();
        }
        return Navigation.instance;
    }

}

export const navigation = Navigation.getInstance();
