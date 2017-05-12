import { Component } from '@angular/core';

class PageNotFoundComponent { }

/**
 * Note I use a little bootstrap layout there, the "rows" and "cols", etc.
 * This is more just to show it works rather than a practical implementation,
 * if you don't use bootstrap feel free to remove it.
 */

PageNotFoundComponent.annotations = [
    new Component ( {
        template: `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="content-square">
                          <h4>We're sorry, that URL doesn't map to a page!</h4>
                          <p>
                            This is probably our fault, please go straight to:
                            <br />
                            <a href=""><b>The Home page</b></a>
                          </p>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
];

export { PageNotFoundComponent }