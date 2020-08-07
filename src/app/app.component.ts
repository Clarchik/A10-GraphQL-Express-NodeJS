import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import gql from 'graphql-tag';

const UPDATE_USER_QUERY = gql`
    mutation addUser($_id: String!, $name: String!, $email: String!) {
        addUser(_id: $_id, name: $name, email: $email) {
            _id,
            name,
            email
        }
    }
`;

const USER_SUBSCRIPTION = gql`
    subscription userAdded {
        userAdded {
            _id
            name
            email
        }
    }
`;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    usersQuery$: QueryRef<any>;
    users$: Observable<any>;
    constructor(private apollo: Apollo) { }

    ngOnInit(): void {
        this.usersQuery$ = this.getUsers();
        this.users$ = this.usersQuery$.valueChanges.pipe(map(({ data }: { data: any }) => data.users));
        this.subscribeToNewUsers();
    }

    getUsers(): QueryRef<any> {
        return this.apollo.watchQuery({
            query: gql`{ users { _id, name, email } } `
        });
    }

    addMore(): void {
        const data = Math.random() * 10;
        this.apollo.mutate({
            mutation: UPDATE_USER_QUERY,
            variables: {
                _id: `${data}`,
                name: `${data}`,
                email: `${data}@mail.ru`
            }
        }).subscribe();
    }

    subscribeToNewUsers(): void {
        this.usersQuery$.subscribeToMore({
            document: USER_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                const newUserAdded = subscriptionData.data.userAdded;

                return {
                    ...prev,
                    users: [...prev.users, newUserAdded]
                };
            }
        });
    }
}
